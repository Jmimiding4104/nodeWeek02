const HttpControllers = require('../controllers/http')
const PostsControllers = require('../controllers/posts')

const routes = async (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    const {url, method} = req;
    if (url === '/posts' && method === 'GET') {
      PostsControllers.getPosts(req, res)
    } else if (url === '/posts' && method === 'POST') {
      req.on('end', () => {
        PostsControllers.createPosts(req, res, body)
      })
    } else if (url === '/posts' && method === 'OPTIONS') {
      HttpControllers.cors(req, res)
    } else if (url === '/posts' && method === 'DELETE') {
      PostsControllers.deleteAll(req, res)
    } else if (url.startsWith('/posts/') && method === 'DELETE') {
      PostsControllers.deleteOne(req, res, url)
    } else if (url.startsWith('/posts/') && method === 'PATCH') {
      req.on('end', () => {
        PostsControllers.updataOne(req, res, url, body)
      })   
    } else {
      HttpControllers.notFound(req, res)
    }
  };

  module.exports = routes;