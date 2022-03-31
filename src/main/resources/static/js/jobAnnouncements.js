let mainColumns = "<tr>" +
    "                    <th>name</th>" +
    "                    <th>approve/reject(test)</th>" +
    "                </tr>"

let row = "<tr>" +
    "                    <td><a href='%link%' >%name%</a></td>" +
    "                    <td>%accepted%</td>" +
    "                </tr>"

let table = document.getElementById("job_announcements_table");

updateTable()

function updateTable() {
    table.innerHTML = mainColumns
    for (let jobAnnouncement of job_announcements) {
        let tempRow = row
        tempRow =
            tempRow.replace("%name%", jobAnnouncement.name)
                .replace("%link%", jobAnnouncement.id)
                .replace("%accepted%", getApproveRejectButtons(jobAnnouncement.id))
        table.innerHTML += tempRow
    }
}

function getApproveRejectButtons(id) {
    let approveOnClick = "onclick = requestToApproveAnnouncement('" + id + "')"
    let rejectOnClick = "onclick = requestToRejectAnnouncement('" + id + "')"
    return "<div>" +
        "<button " + approveOnClick + ">Approve</button>" +
        "<button " + rejectOnClick + ">Reject</button>" +
        "</div>"
}

function requestToApproveAnnouncement(id) {
    httpGet(BACKEND_URL + "/job_announcements/approve?id=" + id)
    location.reload()
}

function requestToRejectAnnouncement(id) {
    httpGet(BACKEND_URL + "/job_announcements/reject?id=" + id)
    location.reload()
}