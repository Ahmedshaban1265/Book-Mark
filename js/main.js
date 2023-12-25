var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var box = document.querySelector(".box");


var siteList = [];

if (localStorage.getItem("sites") != null) {
    siteList = JSON.parse(localStorage.getItem("sites"))
    displaySite();
}

function addSite() {
    if (validationSiteName() == true && validationSiteUrl() ==true) {
        var website = {
            name: siteName.value,
            url: siteUrl.value
        }
        siteList.push(website);
        displaySite();
        clearForm();
        siteName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");
        localStorage.setItem("sites", JSON.stringify(siteList));
    }
    else {
        box.classList.remove("d-none");
    }


}

function displaySite() {
    var container = "";
    for (var i = 0; i < siteList.length; i++) {
        container += `
            <tr>
                <td>${i + 1}</td>
                <td>${siteList[i].name}</td>
                <td><button onclick="visitSite(${i})" class="visit-btn btn btn-primary"><i class="fa-solid fa-eye pe-2 "></i> Visit</button></td>
                <td><button onclick="deleteSite(${i})" class="delete-btn btn btn-danger "><i class="fa-solid fa-trash-can pe-2 "></i> Delete</button></td>
            </tr>
        `
    }
    document.getElementById("table-body").innerHTML = container;
}

function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}

function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(siteList));
    displaySite();
}

function visitSite(index) {
    var url = siteList[index].url;
    if (url.startsWith("https://" || "http://")) {
        window.open(url, "_blank");
    }
    else {
        window.open("http://" + url, "_blank");
    }
}



function validationSiteName() {
    var regexSiteName = /^\w{3,}(\s+\w+)*$/;
    if (regexSiteName.test(siteName.value) == true) {
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
        return true;
    }
    else {
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
        return false;
    }
}

function validationSiteUrl() {
    var regexSiteUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (regexSiteUrl.test(siteUrl.value)==true) {
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        return true;
    }
    else {
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
        return false;
    }

}


function closeBox() {
    box.classList.add("d-none");
}
