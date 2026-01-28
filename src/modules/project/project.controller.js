const ProjectService = require('./project.service')

exports.createProject = async (req, res) => {
    try {
        const userId = req.user.id
        const project = await ProjectService.createProject(req.body, req.files, userId)
        res.status(201).json({ success: true, project })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.addImages = async (req, res) => {
    try {
        const project = await ProjectService.addImagesToProject(req.params.id, req.files)
        res.status(200).json({ success: true, project })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}
