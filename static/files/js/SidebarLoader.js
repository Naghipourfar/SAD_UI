var benPageTypes = [
    "Dashboard",
    "EditProfile",
    "EditPassword",
    "DoneFinancial",
    "DoneNonFinancial",
    "OnGoingNonFinancial",
    "IncomingRequests",
    "Feedbacks",
    "FeedbacksOnMe"
];

var benPageTypeTexts = [
    "داشبورد",
    "ویرایش پروفایل",
    "ویرایش رمز عبور",
    "پروژه های نقدی انجام شده",
    "پروژه های غیر نقدی انجام شده",
    "پروژه های غیر نقدی در حال انجام",
    "درخواست های من",
    "مشاهده نظرات داده شده",
    "مشاهده نظرات دیگران درباره خود"
];

var orgPageTypes = [
    "Dashboard",
    "EditProfile",
    "EditPassword",
    "OnGoingProjects",
    "MyRequests",
    "DoneProjects",
    "NewProject",
    "Feedbacks",
    "FeedbacksOnMe"
];

var orgPageTypeTexts = [
    "داشبورد",
    "ویرایش پروفایل",
    "ویرایش رمز عبور",
    "پروژه های در حال انجام",
    "درخواست‌های من",
    "پروژه‌های انجام شده",
    "ایجاد پروژه جدید",
    "مشاهده نظرات داده شده",
    "مشاهده نظرات دیگران درباره خود"
];

function loadSidebar(currentPage, userType="Benefactor"){
    var pageTypes = [];
    var pageTypeTexts = [];
    if (userType == "Benefactor") {
        pageTypes = benPageTypes;
        pageTypeTexts = benPageTypeTexts;
    } else {
        pageTypes = orgPageTypes;
        pageTypeTexts = orgPageTypeTexts;
    }
    console.log(pageTypes);
    console.log(pageTypeTexts);
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