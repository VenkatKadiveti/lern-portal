var express = require('express');
var app = express();
const proxy = require("express-http-proxy");
const { DISCUSSIONS_MW_URL } = require('../config/environment');
const proxyUtils = require('../proxyUtils');

app.post(`/forum/v2/read`, proxyObjectForForum());
app.post(`/forum/v2/create`, proxyObject());
app.post(`/forum/v2/remove`, proxyObject());
app.post(`/forum/v3/create`, proxyObject());
app.post(`/forum/tags`, proxyObject());
app.post(`/privileges/v2/copy`, proxyObject());
app.post(`/forum/v3/user/profile`, proxyObject());

app.post(`/forum/v2/users/details`, proxyObject());

app.post(`/forum/v3/group/membership`, proxyObject());
app.post(`/forum/v3/groups/users`, proxyObject());
app.post(`/forum/v3/category/:cid/privileges`, proxyObject());

app.get(`/tags`, proxyObject());
app.post(`/tags/list`, proxyObject());
app.get(`/tags/:tag`, proxyObject());

app.get(`/categories`, proxyObject());
app.post(`/category/list`, proxyObject());

app.get(`/notifications`, proxyObject());

app.get(`/user/:userslug`, proxyObject())
app.get(`/user/:userslug/upvoted`, proxyObject())
app.get(`/user/:userslug/downvoted`, proxyObject())
app.get(`/user/:userslug/bookmarks`, proxyObject())
app.get(`/user/:userslug/best`, proxyObject())
app.get(`/user/:userslug/posts`, proxyObject())

// categories apis
app.get(`/category/:category_id/:slug`, proxyObject());
app.get(`/category/:cid`, proxyObject());
app.get(`/categories/:cid/moderators`, proxyObject());

// topic apis
app.get(`/unread`, proxyObject());
app.get(`/recent`, proxyObject());
app.get(`/popular`, proxyObject());
app.get(`/top`, proxyObject());
app.get(`/topic/:topic_id/:slug`, proxyObject());
app.get(`/topic/:topic_id`, proxyObject());
app.get(`/unread/total`, proxyObject());
app.get(`/topic/teaser/:topic_id`, proxyObject());
app.get(`/topic/pagination/:topic_id`, proxyObject());

// groups api
app.get(`/groups`, proxyObject());
app.get(`/groups/:slug`, proxyObject());
app.get(`/groups/:slug/members`, proxyObject());

// post apis
app.get(`/recent/posts/:day`, proxyObject());

// all admin apis
app.get(`/user/admin/watched`, proxyObject());
app.get(`/user/admin/info`, proxyObject());
app.get(`/user/admin/bookmarks`, proxyObject());
app.get(`/user/admin/posts`, proxyObject());
app.get(`/user/admin/groups`, proxyObject());
app.get(`/user/admin/upvoted`, proxyObject());
app.get(`/user/admin/downvoted`, proxyObject());

// topics apis
app.post(`/v2/topics`, proxyObject());
app.post(`/v2/topics/:tid`, proxyObject());
app.post(`/v2/topics/update/:tid`, proxyObject());
app.delete(`/v2/topics/:tid`, proxyObject());
app.put(`/v2/topics/:tid/state`, proxyObject());
app.put(`/v2/topics/:tid/follow`, proxyObject());
app.delete(`/v2/topics/:tid/follow`, proxyObject());
app.put(`/v2/topics/:tid/tags`, proxyObject());
app.delete(`/v2/topics/:tid/tags`, proxyObject());
app.put(`/v2/topics/:tid/pin`, proxyObject());
app.delete(`/v2/topics/:tid/pin`, proxyObject());

// categories apis
app.post(`/v2/categories`, proxyObject());
app.put(`/v2/categories/:cid`, proxyObject());
app.delete(`/v2/categories/:cid`, proxyObject());
app.put(`/v2/categories/:cid/state`, proxyObject());
app.delete(`/v2/categories/:cid/state`, proxyObject());
app.put(`/v2/categories/:cid/privileges`, proxyObject());
app.delete(`/v2/categories/:cid/privileges`, proxyObject());

// groups apis 
app.post(`/v2/groups`, proxyObject());
app.delete(`/v2/groups/:slug`, proxyObject());
app.put(`/v2/groups/:slug/membership`, proxyObject());
app.put(`/v2/groups/:slug/membership/:uid`, proxyObject());
app.delete(`/v2/groups/:slug/membership`, proxyObject());
app.delete(`/v2/groups/:slug/membership/:uid`, proxyObject());


// post apis 
app.get(`/post/pid/:pid`, proxyObject());
app.get(`/v3/posts/:pid`, proxyObject());
app.post(`/v2/posts/:pid`, proxyObject());
app.delete(`/v2/posts/:pid`, proxyObject());
app.put(`/v2/posts/:pid/state`, proxyObject());
app.delete(`/v2/posts/:pid/state`, proxyObject());
app.post(`/v2/posts/:pid/vote`, proxyObject());
app.delete(`/v2/posts/:pid/vote`, proxyObject());
app.post(`/v2/posts/:pid/bookmark`, proxyObject());
app.delete(`/v2/posts/:pid/bookmark`, proxyObject());

// util apis 
app.post(`/v2/util/upload`, proxyObject());
app.post(`/v2/util/maintenance`, proxyObject());
app.delete(`/v2/util/maintenance`, proxyObject());

// user api
app.post(`/v2/users`, proxyObject());
app.put(`/v2/users/:uid`, proxyObject());
app.delete(`/v2/users/:uid`, proxyObject());
app.put(`/v2/users/:uid/password`, proxyObject());
app.put(`/v2/users/:uid/follow`, proxyObject());
app.delete(`/v2/users/:uid/follow`, proxyObject());
app.post(`/v2/users/:uid/chats`, proxyObject());
app.put(`/v2/users/:uid/ban`, proxyObject());
app.delete(`/v2/users/:uid/ban`, proxyObject());
app.get(`/v2/users/:uid/tokens`, proxyObject());
app.post(`/v2/users/:uid/tokens`, proxyObject());
app.delete(`/v2/users/:uid/tokens/:token`, proxyObject());
app.get(`/user/username/:username`, proxyObject());

app.post(`/user/v1/create`, proxyObjectForCreate());
app.get(`/user/uid/:uid`, proxyObject());


function proxyObject() {
    return proxy(DISCUSSIONS_MW_URL, {
        proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders(),
        proxyReqPathResolver: function (req) {
            let urlParam = req.originalUrl;
            const uid = req.session['nodebb_uid'];
            console.log("Request comming from :", urlParam);
            let query = require('url').parse(req.url).query;
            if (query) {
                const queryData = !(req.query._uid) ? `&_uid=${uid}` : '';
                const path = require('url').parse(DISCUSSIONS_MW_URL + urlParam + queryData).path
                return path
            } else {
                return require('url').parse(DISCUSSIONS_MW_URL + urlParam+ '?_uid='+ uid).path
            }
        }
    })
}


function proxyObjectForForum() {
    return proxy(DISCUSSIONS_MW_URL, {
        proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders(DISCUSSIONS_MW_URL),
        proxyReqPathResolver: function (req) {
            let urlParam = req.originalUrl;
            console.log("Request comming from :", urlParam);
            return require('url').parse(DISCUSSIONS_MW_URL + urlParam).path
        }
    })
}


function proxyObjectForCreate() {
    return proxy(DISCUSSIONS_MW_URL, {
        proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders(DISCUSSIONS_MW_URL),
        proxyReqPathResolver: function (req) {
            let urlParam = req.originalUrl;
            return require('url').parse(DISCUSSIONS_MW_URL + urlParam).path;
        },
        userResDecorator: (proxyRes, proxyResData, req, res) => {
            try {
                const data = JSON.parse(proxyResData.toString('utf8'));
               
                const nodebb_uid = data.result['userId']['uid'];
                if(nodebb_uid) {
                    req.session['nodebb_uid'] = nodebb_uid;
                    req.session.save()
                }

                return proxyResData;
            } catch (err) {
                console.log('Error: ', err.message);
                return {Error: err.message}
            }
        }
    })
}

module.exports = app;