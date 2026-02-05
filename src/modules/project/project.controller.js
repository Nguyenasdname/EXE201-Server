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

exports.getProjectById = async (req, res) => {
    const id = req.params.id
    try {
        const project = await ProjectService.getProjectById(id)
        res.status(200).json(project)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectService.getAllProjects()
        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.getProjectsByUserId = async (req, res) => {
    const userId = req.user.id
    try {
        const projects = await ProjectService.getProjectByUserId(userId)
        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.approveProject = async (req, res) => {
    const projectId = req.params.id
    try {
        const approveProject = await ProjectService.approveProject(projectId)
        res.status(200).json(approveProject)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }

}

exports.deniedProject = async (req, res) => {
    const projectId = req.params.id
    try {
        const deniedProject = await ProjectService.deniedProject(projectId)
        res.status(200).json(deniedProject)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}