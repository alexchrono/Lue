const togglePic = (user,tempState,playSoundFunction) => {
    return new Promise((resolve) => {
        const avatarPic = document.querySelector('.userGif');
        if (avatarPic) {
            const prevSrc = avatarPic.src;
            if (tempState==='hurt') {
            avatarPic.src = `${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-hurt-${user.armor}-${user.weapon}.gif`;
            playSoundFunction('hurtSound');
            }
            else {
                avatarPic.src = `${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-victory-${user.armor}-${user.weapon}.gif`;
                playSoundFunction('victorySound');
            }
            setTimeout(() => {
                avatarPic.src = `${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${user.armor}-${user.weapon}.gif`
                resolve();
            }, 2000);
        } else {
            resolve();
        }
    });
};

export default togglePic;
