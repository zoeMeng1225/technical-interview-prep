/**
 * Given a list of strings, implement a function listFormat that returns the items concatenated into a single string. A common use case would be in summarizing the reactions for social media posts.

The function should support a few options as the second parameter:

sorted: Sorts the items by alphabetical order.
length: Show only the first length items, using "and X other(s)" for the remaining. Ignore invalid values (negative, 0, etc).
unique: Remove duplicate items.
 * 
 */

/**
 * @param {Array<string>} items
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */

interface ListFormatOptions{
    sorted?:boolean; //if true, sorts the items alphabetically
    length?:number; //if > 0, limites the number
    unique?:boolean;
}

function listFormat(items: string[], options?: ListFormatOptions): string{
    //create a shallow copy to avoid mutating the original array
    let processedItems = [...items];
    processedItems = processedItems.filter(item => item && item.trim().length > 0)

    //handle 'unique' option: Remove duplicates using Set
    if(options?.unique){
        processedItems = Array.from(new Set(processedItems))
    }

    //handle 'sorted' option: sort alphabetically
    if(options?.sorted){
        processedItems.sort();
    }

    //handle empty list case immediately
    if(processedItems.length === 0){
        return ''
    }

    //handle 'length' option(Truncation)
    //we only truncate if length is valid (> 0) and actually smaller than the list size
    if(options?.length && options.length > 0  && options.length < processedItems.length){
        const limit = options.length;
        const visibleItems = processedItems.slice(0, limit);
        const remainingCount = processedItems.length - limit;

        //in truncation made, all visable items are joined be comma, followed by the summary
        return `${visibleItems.join(', ')} and ${remainingCount} other(s)`
    }

    //standard format(no truncation)
    if(processedItems.length === 1){
        return processedItems[0]
    }

    //if multiple items, join all except last with comma, and join last with "and"
    const lastItem = processedItems.pop(); //remove last item
    return `${processedItems.join(', ')} and ${lastItem}`
}


export default listFormat