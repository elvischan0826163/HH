$("#mainPage").click(function () {
    mainPageAddress = location.href.split('/');
    homePage = (mainPageAddress[0]+"//"+mainPageAddress[2]);
    location.href = homePage;
});