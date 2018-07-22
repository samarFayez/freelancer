const project = require('../model/query/project');
const uuidv1 = require('uuid/v1');

const addProject = (req, res) => {
  res.render('addProject');
};
const postAddProject = (req, res) => {
  const { id } = req.user;
  const { title, details, duration, from, to } = req.body;
  let { skill } = req.body;
  const price = `${from}-${to}$`;

  if (!Array.isArray(skill)) {
    skill = [skill];
  }
  project.insertProject(id, title, details, duration, price, (err, result) => {
    if (err) {
      return console.log(err, 'err');
    }
    skill.forEach((value, index, array) => {
      project.insertProjectSkill(result[0].id, value, (er, respopnse) => {
        if (index === array.length - 1) {
          if (!req.files)
            return res.render('addProject', { err: 'No files were uploaded.' });
          if (!Array.isArray(req.files.file)) {
            req.files.file = [req.files.file];
          }
          for (let i = 0; i < req.files.file.length; i++) {
            let sampleFilePhoto = req.files.file[i];
            let extensionPhoto = req.files.file[i].name.split('.')[
              req.files.file[i].name.split('.').length - 1
            ];
            let fileName = req.files.file[i].name;
            let fileNameEnc = uuidv1(fileName);
            let nameOfFilesPhoto = `${fileNameEnc}.${extensionPhoto}`;
            sampleFilePhoto.mv(
              `${__dirname}/../../public/uploads/${nameOfFilesPhoto}`,
              err => {
                if (err) return console.log(err, 'err');
                let pathFilePhoto = `/uploads/${nameOfFilesPhoto}`;
                project.insertProjectFiles(
                  result[0].id,
                  pathFilePhoto,
                  fileName,
                  err2 => {
                    if (err2) {
                      return console.log(err2, 'err2');
                    }
                    if (i == req.files.file.length - 1)
                      res.render('addProject', {
                        success: 'تمت الاضافة بنجاح'
                      });
                  }
                );
              }
            );
          }
        }
      });
    });
  });
};
module.exports = {
  addProject,
  postAddProject
};
