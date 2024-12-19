const generateSlug = (title) => {
    // "Kitchen Accessories" -> "kitchen-accessories"
    const titleArr = title.trim().split(" "); // string to arrary
    const fA = titleArr.filter(i => i != "");
    const slug = fA.join("-").toLowerCase(); // array to string

    return slug;
}



export { generateSlug };