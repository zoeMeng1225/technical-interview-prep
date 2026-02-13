/**
 * Finds all descendant elements that match a specific computed CSS style.
 *
 * @param element - The root element to start the search from (descendants only).
 * @param property - The CSS property to check (e.g., 'font-size', 'color').
 * @param value - The expected value of the CSS property (e.g., '12px', 'rgb(255, 0, 0)').
 * @return An array of HTML elements that match the style.
 */


export default function getElementByStyle(element: Element, property: string, value: string ): Array<Element>{
    //initialize an array to store the matching elements;
    const result : Array<Element> = [];

    //helper function for recursive traveral
    //allow direct access to result
    function reverse(node: Element){
        //check inline styles
        const computeredStyle = window.getComputedStyle(node);
        
        //check if the property matches
        if(computeredStyle.getPropertyValue(property) === value){
            result.push(node)
        }

        //recurively traverse all children of the current node.
        for(let i = 0; i < node.children.length; i++){
            reverse(node.children[i])
        }
    }

    for(let i = 0; i < element.children.length; i++){
        reverse(element.children[i])
    }
    return result;
}