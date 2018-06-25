
function decodeString(string) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(string, 'text/html').body.textContent;
    return (decodedString);
}

module.exports={
    decodeString
};