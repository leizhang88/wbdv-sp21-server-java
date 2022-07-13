function CourseServiceClient() {
    this.createCourse = createCourse;
    this.findAllCourses = findAllCourses;
    this.findCourseById = findCourseById;
    this.deleteCourse = deleteCourse;
    this.updateCourse = updateCourse;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/lzhang/courses';
    let self = this;
    function createCourse(course) {
        return fetch(self.url, {
            method: "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(course)
        })
            .then(function(response) {
                return response.json()
            })
    }
    function findAllCourses() {
        return fetch(self.url)
            .then(function (response) {
                return response.json()
            })
    }
    function findCourseById(cId) {

    }
    function updateCourse(cId, course) {
        return fetch(`${self.url}/${cId}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(course)
        }).then(response => response.json())
    }
    function deleteCourse(cId) {
        return fetch(`${self.url}/${cId}`, {method: "DELETE"})
    }
}
