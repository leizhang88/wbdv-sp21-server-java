let $usernameFld, $passwordFld;
let $firstNameFld, $lastNameFld, $roleFld;
let $removeBtn, $editBtn, $createBtn, $updateBtn;
let $tableBody;
let selectedUser, users = []

let userService = new AdminUserServiceClient();

$(init)

function init() {
    $("h1").click(() => {
        $("h1").css('background-color', 'orange')
    })
    $tableBody = $(".wbdv-tbody")
    $createBtn = $(".wbdv-create")
    $updateBtn = $(".wbdv-update")
    $removeBtn = $(".wbdv-remove")
    $editBtn = $(".wbdv-edit")
    $usernameFld = $("#usernameFld")
    $passwordFld = $("#passwordFld")
    $firstNameFld = $("#firstNameFld")
    $lastNameFld = $("#lastNameFld")
    $roleFld = $("#roleFld")

    userService.findAllUsers()
        .then((actualUsers) => {
            users = actualUsers
            renderUsers(users);
            console.log(users)
        })

    $createBtn.click(createUser)
    $updateBtn.click(updateUser)
}
function createUser() {
    let newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstname: $firstNameFld.val(),
        lastname: $lastNameFld.val(),
        role: $roleFld.val()
    }
    // users.push(newUser)
    userService.createUser(newUser)
        .then((actualUser) => {
            users.push(actualUser)
            renderUsers(users)
        })
    $usernameFld.val("")
    $passwordFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    $roleFld.val("")
}
function deleteUser(event) {
    let index = $(event.target).attr("id")
    userService.deleteUser(users[index]._id)
        .then((status) => {
            users.splice(index, 1)
            renderUsers(users)
        })
}
function selectUser(event) {
    selectedUser = users.find(user => user._id === $(event.target).attr('id'))
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstname)
    $lastNameFld.val(selectedUser.lastname)
    $roleFld.val(selectedUser.role)
}
function updateUser() {
    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstname = $firstNameFld.val()
    selectedUser.lastname = $lastNameFld.val()
    selectedUser.role = $roleFld.val()
    userService.updateUser(selectedUser._id, selectedUser)
        .then((status) => {
            let index = users.findIndex(user => user._id === selectedUser._id)
            users.splice(index, 1)
            users = [selectedUser].concat(users)
            renderUsers(users)
            $usernameFld.val("")
            $passwordFld.val("")
            $firstNameFld.val("")
            $lastNameFld.val("")
            $roleFld.val("")
        })
}
function renderUsers(users) {
    $tableBody.empty();
    for(let i = 0; i < users.length; i++) {
        let user = users[i]
        $tableBody.append(`
            <tr class="wbdv-template wbdv-user wbdv-hidden">
                <td class="wbdv-username">${user.username}</td>
                <td>&nbsp;</td>
                <td class="wbdv-first-name">${user.firstname}</td>
                <td class="wbdv-last-name">${user.lastname}</td>
                <td class="wbdv-role">${user.role}</td>
                <td class="wbdv-actions">
                    <span class="d-flex justify-content-end">
                        <i class="fa-2x fa fa-times wbdv-delete" id="${i}"></i>
                        <i class="fa-2x fa fa-pencil wbdv-edit" id="${user._id}"></i>
                    </span>
                </td>
            </tr>
        `)
    }
    $(".wbdv-delete").click(deleteUser)
    $(".wbdv-edit").click(selectUser)
}
