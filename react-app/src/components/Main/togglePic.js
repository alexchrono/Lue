const togglePic = () => {
    const avatarPic = document.querySelector('.userGif');
    const prevSrc = avatarPic.src;
    avatarPic.src = `${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-hurt-${user.armor}-${user.weapon}.gif`;
    setTimeout(() => {
        avatarPic.src = prevSrc;
    }, 2000);
};

export default togglePic;
