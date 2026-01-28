const ProjectPackage = require('./projectPackage.model')

exports.getAllPackage = async () => {
    const projectPackages = await ProjectPackage.find()
    return projectPackages
}

exports.addNewPackage = async (data) => {
    const projectPackage = new ProjectPackage({
        ...data
    })

    await projectPackage.save()
    return projectPackage
}

exports.getPackageById = async (packageId) => {
    const projectPackage = await ProjectPackage.findById(packageId)
    return projectPackage
}