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
    'student_status': (studentId) => `/student_do_thesis/${studentId}/update_status/`,
    'defense_committee': '/thesis_defense_committee/',
    'defense_committee_create': '/thesis_defense_committee/',
    'defense_committee_detail': (defenseId) => `/thesis_defense_committee/${defenseId}/committee_members/`,
    'defense_committee_id': (defenseId) => `/thesis_defense_committee/${defenseId}/`,
    'defense_committee_update': (defenseId) => `/thesis_defense_committee/${defenseId}/`,
    'committee_join':  `/committee_member/join/`,
    'committee_member_detail': (committeeId) => `/committee_member/${committeeId}/committee_teacher_user`,
    'committee_member_update_role': (committeeId) => `/committee_member/${committeeId}/update_role/`,
    'teacher_do_thesis_add': `/teacher_do_thesis/`,
    'techers_do_thesis': `/teacher_do_thesis/`,
    'teacher_detail': (teacherId) => `/teacher_do_thesis/${teacherId}/`,
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