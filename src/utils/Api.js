/**
 * Created by pasquale on 25/08/2017.
 */
import $ from 'jquery';

/* THIS IS THE POSTS APIs */

export function getCategories () {
    return $.ajax({
        url:'http://localhost:5001/categories',
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

export function getCategoryPosts (category) {
    let url = 'http://localhost:5001/' + category + '/posts'
    return $.ajax({
        url: url,
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

export function getPosts() {
    return $.ajax({
        url: 'http://localhost:5001/posts',
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

export function addPost(param) {
    return $.ajax({
        url: 'http://localhost:5001/posts',
        method: 'POST',
        headers: { 'Authorization': 'whatever-you-want' },
        data: JSON.stringify(param),
        contentType: "application/json",
    })
}

export function getPost(id) {
    let url = 'http://localhost:5001/posts/' + id
    return $.ajax({
        url: url,
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

export function votePost(vote, id) {
    let url = 'http://localhost:5001/posts/' + id
    let data = {
        option: vote
    };
    return $.ajax({
        url: url,
        method: 'POST',
        headers: { 'Authorization': 'whatever-you-want' },
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

export function editPost(data, id) {
    let url = 'http://localhost:5001/posts/' + id
    return $.ajax({
        url: url,
        method: 'PUT',
        headers: { 'Authorization': 'whatever-you-want' },
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

export function deletePost(id) {
    let url = 'http://localhost:5001/posts/' + id
    return $.ajax({
        url: url,
        method: 'DELETE',
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

/* THIS IS THE COMMENTS APIs */

export function getPostComments(id) {
    let url = 'http://localhost:5001/posts/' + id + '/comments'
    return $.ajax({
        url: url,
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

export function commentPost(data) {
    return $.ajax({
        url:'http://localhost:5001/comments',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

export function getCommentDetails(id) {
    let url = 'http://localhost:5001/comments/' + id
    return $.ajax({
        url: url,
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

export function voteComment(vote, id) {
    let url = 'http://localhost:5001/comments/' + id
    let data = {
        option: vote
    }
    return $.ajax({
        url: url,
        method: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: { 'Authorization': 'whatever-you-want' },
    })
}

export function editComment(data, id) {
    let url = 'http://localhost:5001/comments/' + id
    return $.ajax({
        url: url,
        method: 'PUT',
        headers: { 'Authorization': 'whatever-you-want' },
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

export function deleteComment(id) {
    let url = 'http://localhost:5001/comments/' + id
    return $.ajax({
        url: url,
        method: 'DELETE',
        headers: { 'Authorization': 'whatever-you-want' },
    })
}