const getPageNumbers = (numberOfPosts) => {
    const numberOfPages = numberOfPosts / 4;

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
        pageNumbers = [...pageNumbers, i];
    }

    return pageNumbers;
};

export default getPageNumbers;
