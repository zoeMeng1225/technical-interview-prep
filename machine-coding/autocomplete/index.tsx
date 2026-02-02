import React, {useState, useEffect, useRef} from 'React';

//simulate API request
const fetchSuggestions = async(query: string, signal: AbortSignal) => {
    const response = await fetch(`http://api.example.com/search?q=${query}`, {signal});
    return await response.json()
}

const Autocomplete = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([])
    const cache = useRef<Record<string, any>>({}) //cache

    useEffect(() => {
        if(!query){
            setSuggestions([]);
            return;
        }
        
        //check cache
          if(cache.current[query]){
            setSuggestions(cache.current[query]);
            return;
        }

        //handle race condition: create controller
        const controller = new AbortController();
        
        const getData = setTimeout(async () => {
            try{
                const data = await fetchSuggestions(query, controller.signal);
                cache.current[query] = data //store in the cache
                setSuggestions(data) 
            }catch(err: any){
                if(err.name !== 'AbortError'){
                    console.error('Fetch Error', err);
                }
            }
        },300) //debounce 300ms
        return () => {
            clearTimeout(getData);
            controller.abort(); //cancel last reuest when component is uploaded or next input is made
        }
    },[query])
    
    return (
        <div>
            <input type="text" 
                value={query} 
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} 
                placeholder="Search"/>
            <ul>
                {suggestions.map((item: any) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )

}