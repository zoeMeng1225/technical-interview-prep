/**In classnames, we implemented classnames, a commonly-used utility in modern front end 
 * applications to conditionally join CSS class names together. However, there are some cases
 * that the library does not do:
 */



export default function classNames(...args:any[]): string{
    const classes = new Set<string>();

    //define the recursive processing function
    function process(item:any){
        if(!item) return;
        
        const type = typeof item;
        
        if(type === 'string' || type === 'number'){
            //basic case: Add class name(automatic deduplication)
            classes.add(String(item))
        }else if(type === 'function'){
            //function case: excution and process the return value
            //for example: classNames(() => 'foo') -> 'foo'
            process(item())
        }else if(Array.isArray(item)){
            //Array case: recursive traversal
            item.forEach(process); //item.forEach(i => process(i))
        }else if(type === 'object'){
            //Object case: handle switch logic
            //for example: classNames({foo: true, bar:false})
            Object.keys(item).forEach(key => {
                if(item[key]){
                    classes.add(key) //is true -> turn on
                }else{
                    classes.delete(key) //is false -> turn off
                }
            })
        }
    }
    //traverse all args
    args.forEach(process); //arg.forEach(i => process(i))
    return Array.from(classes).join(' ')
}