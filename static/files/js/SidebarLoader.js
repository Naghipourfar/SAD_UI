pageTypes = [
    "Dashboard",
    "DoneFinancial",
    "DoneNonFinancial",
    "EditPassword",
    "EditProfile",
    "OnGoingNonFinancial",
    "IncomingRequests"
];

pageTypeTexts = [
    "داشبورد",
    "پروژه های نقدی انجام شده",
    "پروژه های غیر نقدی انجام شده",
    "ویرایش رمز عبور",
    "ویرایش پروفایل",
    "پروژه های غیر نقدی در حال انجام",
    "درخواست های من"
];

function loadSidebar(currentPage, userType="Benefactor"){
    alert("Salam!");
    var sidebarTag = $("#sidebar");
    for (var i = 0; i < pageTypes.length; i++) {
        var pageType = pageTypes[i];
        var pageTypeText = pageTypeTexts[i];
        if (pageType == currentPage){
            alert(pageType);
            var aTag = '<a class="active item" href="' + userType + currentPage + '">';
            aTag += pageTypeText;
            aTag += '</a>';
            sidebarTag.append(aTag);
        } else { 
            var aTag = '<a class="item" href="' + userType + currentPage + '">';
            aTag += pageTypeText;
            aTag += '</a>';
            sidebarTag.append(aTag);
        }
        
    }
}