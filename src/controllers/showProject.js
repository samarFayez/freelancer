const project = require('../model/query/project');
const auth = require('../model/query/auth');

const showProject = (req, res) => {
  const { email } = req.user;
  auth.selectData(email, (err, user) => {
    console.log(user[0], 'user');
    project.allProject((err, projects) => {
      project.allFiles((er, files) => {
        project.allSkills((e, skills) => {
          project.allComments((error, comments) => {
            res.render('showProject', {
              projects: convert(projects, files, skills, comments),
              tPhoto: user[0].photo
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
module.exports = { showProject };
