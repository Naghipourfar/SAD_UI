var pageTypes = [
    "Dashboard",
    "EditProfile",
    "EditPassword",
    "DoneFinancial",
    "DoneNonFinancial",
    "OnGoingNonFinancial",
    "IncomingRequests"
];

var pageTypeTexts = [
    "داشبورد",
    "ویرایش پروفایل",
    "ویرایش رمز عبور",
    "پروژه های نقدی انجام شده",
    "پروژه های غیر نقدی انجام شده",
    "پروژه های غیر نقدی در حال انجام",
    "درخواست های من"
];

function loadSidebar(currentPage, userType="Benefactor"){
    var sidebarTag = $("#sidebar_menu");
    for (var i = 0; i < pageTypes.length; i++) {
        var pageType = pageTypes[i];
        var pageTypeText = pageTypeTexts[i];
        if (pageType == currentPage){
            var aTag = '<a class="active item" href="' + userType + pageType + '.html">';
            aTag += pageTypeText;
            aTag += '</a>';
            sidebarTag.append(aTag);
        } else { 
            var aTag = '<a class="item" href="' + userType + pageType + '.html">';
            aTag += pageTypeText;
            aTag += '</a>';
            sidebarTag.append(aTag);
        }
    }
}