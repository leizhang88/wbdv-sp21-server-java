
let courses = []
let tableBody
let $titleFld
let $sectionFld
let $seatsFld
let $semesterFld
let $updateBtn
let selectedCourse = null

let courseService = new CourseServiceClient()

function renderCourses(courses) {
    tableBody.empty()
    for (let i = 0; i < courses.length; i++) {
        tableBody.append(`
            <tr>
                <td>${courses[i].title}</td>
                <td>${courses[i].section}</td>
                <td>${courses[i].seats}</td>
                <td>${courses[i].semester}</td>
                <td>
                    <button type="button" class="btn wbdv-course-select-btn" id="${courses[i]._id}">Select</button>
                    <button type="button" class="btn wbdv-course-delete-btn" id="${i}">Delete</button>
                </td>
            </tr>
        `)
    }
    $(".wbdv-course-delete-btn").click(deleteCourse)
    $(".wbdv-course-select-btn").click(selectCourse)
}

function addCourse(newCourse) {
    courseService.createCourse(newCourse)
        .then(function (actualCourse) {
            courses.push(actualCourse)
            renderCourses(courses)
        })
}

function deleteCourse(event) {
    let course = $(event.target)
    let index = course.attr("id")
    let cId = courses[index]._id
    courseService.deleteCourse(cId)
    courses.splice(index, 1)
    renderCourses(courses)
}

function selectCourse(event) {
    let selectBtn = $(event.target)
    let cId = selectBtn.attr("id")
    selectedCourse = courses.find( course => course._id === cId )
    $titleFld.val(selectedCourse.title)
    $sectionFld.val(selectedCourse.section)
    $seatsFld.val(selectedCourse.seats)
    $semesterFld.val(selectedCourse.semester)
}

function init() {
    $titleFld = $(".wbdv-title-fld")
    $sectionFld = $(".wbdv-section-fld")
    $seatsFld = $(".wbdv-seats-fld")
    $semesterFld = $(".wbdv-semester-fld")
    $updateBtn = $(".wbdv-course-update-btn")
    tableBody = $(".wbdv-course-table-body")

    renderCourses(courses)

    $(".wbdv-course-add-btn").click(() => {
        let newCourse = {
            title : $titleFld.val(),
            section: $sectionFld.val(),
            seats: parseInt($seatsFld.val()),
            semester: $semesterFld.val()
        }
        console.log(newCourse)
        addCourse(newCourse)
        $titleFld.val("")
        $sectionFld.val("")
        $seatsFld.val("")
        // $semesterFld.val("")
    })

    $(".wbdv-course-update-btn").click(() => {
        selectedCourse.title = $titleFld.val()
        selectedCourse.section = $sectionFld.val()
        selectedCourse.seats = $seatsFld.val()
        selectedCourse.semester = $semesterFld.val()
        courseService.updateCourse(selectedCourse._id, selectedCourse)
            .then(function (status) {
                let index = courses.findIndex(course => course._id === selectedCourse._id)
                courses[index] = selectedCourse
                renderCourses(courses)
            })
    })

    courseService.findAllCourses()
        .then(function (actualCoursesFromServer) {
            courses = actualCoursesFromServer
            renderCourses(courses)
    })
}

jQuery(init)