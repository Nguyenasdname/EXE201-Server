const ProjectPackageService = require('./projectPackage.service')

exports.getAllPackage = async (req, res) => {
    try {
        const projectPackages = await ProjectPackageService.getAllPackage()
        if (!projectPackages || projectPackages.length == 0) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.json(projectPackages)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.addNewPackage = async (req, res) => {
    try {
        const projectPackage = await ProjectPackageService.addNewPackage(req.body)
        res.status(201).json({ success: true, projectPackage })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.getPackageById = async (req, res) => {
    try {
        const packageId = req.params.packageId
        const projectPackage = await ProjectPackageService.getPackageById(packageId)
        res.status(201).json(projectPackage)
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}