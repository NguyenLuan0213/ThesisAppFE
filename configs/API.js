import axios from "axios";

const HOST = "http://10.0.2.2:8000";
// const HOST = "http://127.0.0.1:8000/";

export const endpoints = {
    'criteria': '/criteria/',
    'specific_criteria': '/specific_criteria/',
    'specific_criteria_detail': (criteriaId) => `/criteria/${criteriaId}/specific_criterias/`,
    'login': '/o/token/',
    'create_user': '/users/current_user/',
    'register': '/users/',
    'thesis': '/thesis/thesis_list/',
    'thesis_detail': (thesisId) => `/thesis/${thesisId}/`,
    'thesis_create': '/thesis/create_thesis/',
    'thesis_delete': (thesisId) => `/thesis/${thesisId}/delete_active/`,
    'thesis_update': (thesisId) => `/thesis/${thesisId}/`,
    'students': '/student_do_thesis/',
    'add_student': '/student_do_thesis/',
    'student_detail': (studentId) => `/student_do_thesis/${studentId}/`,
    'student_delete': (studentId) => `/student_do_thesis/${studentId}/delete_active/`,
    'student_update': (studentId) => `/student_do_thesis/${studentId}/`,
    'student_id': (studentId) => `/student_do_thesis/student_by_id/${studentId}/`,
    'grade': '/score/grade/',
    'grade_spectific': (student_do_thesis_id,user_id) => `api/unscored_criteria/${student_do_thesis_id}/${user_id}/`,
}

export const authApi = (access_token) => axios.create({
    baseURL: HOST,
    headers: {
        Authorization: `Bearer ${access_token}`,
    },
});


export default axios.create({
    baseURL: HOST,
});