const catImages = [
    require('../../images/cats/Cat1.jpg'),
    require('../../images/cats/Cat2.jpg'),
    require('../../images/cats/Cat3.jpg'),
    require('../../images/cats/Cat4.jpg'),
    require('../../images/cats/Cat5.jpg'),
    require('../../images/cats/Cat6.jpg'),
    require('../../images/cats/Cat7.jpg'),
    require('../../images/cats/Cat8.jpg'),
];

export const getAvatar = (id: number) => catImages[id % 8 + 1];