const auth = require('../model/query/auth');
const project = require('../model/query/project');

const addComment = (req, res) => {
  const post_id = req.body.y;
  const comment = req.body.x;
  const { id, email } = req.user;
  console.log(post_id, comment, 'post_id, comment');
  auth.selectData(email, (err, user) => {
    project.addComment(id, post_id, comment, (er, comments) => {
      project.allProject((err, projects) => {
        project.allFiles((er, files) => {
          project.allSkills((e, skills) => {
            project.allComments((error, comments) => {
              // var projects = convert(projects, files, skills, comments);
              res.render('showProject', {
                layout: false,
                projects: convert(projects, files, skills, comments)
              });
            });
          });
        });
      });
    });
  });
};

const convert = (projects, files, skills, comments) =>
  projects.map(project => {
    project.files = [];
    project.files = files.filter(file => {
      if (project.id === file.post_id)
        return { file_id: file.id, file: file.file };
    });
    project.skills = [];
    project.skills = skills.filter(skill => {
      if (project.id === skill.post_id)
        return { skill_id: skill.id, skill: skill.skill };
    });
    project.comments = [];
    project.comments = comments.filter(comment => {
      if (project.id === comment.post_id)
        return { comment_id: comment.id, comment: comment.description };
    });
    return project;
  });
module.exports = { addComment };
