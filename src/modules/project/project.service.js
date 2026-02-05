const Project = require('./project.model')
const { uploadImageToCloudinary } = require('../../utils/cloudinary.service')


exports.createProject = async (data, files, userId) => {
    const brandImageUrls = []
    const activityImageUrls = []
    console.log(data)
    console.log(files)

    if (files?.brandImage) {
        let i = 1
        for (const file of files.brandImage) {
            const customName = `${data.projectName}-brand-${i}`
            const url = await uploadImageToCloudinary(file.path, customName, 'project-images/brand')
            brandImageUrls.push(url)
            i++
        }
    }

    if (files?.activityImage) {
        let i = 1
        for (const file of files.activityImage) {
            const customName = `${data.projectName}-activity-${i}`
            const url = await uploadImageToCloudinary(file.path, customName, 'project-images/activity')
            activityImageUrls.push(url)
            i++
        }
    }


    console.log(`The brandImageUrls is: ${brandImageUrls}`)
    console.log(`The activityImageUrls is: ${activityImageUrls}`)

    const project = new Project({
        ...data,
        userId: userId,
        totalCallValue: Number(data.totalCallValue),
        issueQuantity: Number(data.issueQuantity),
        openTime: data.openTime ? new Date(data.openTime) : undefined,
        brandImage: brandImageUrls,
        activityImage: activityImageUrls
    })

    await project.save()
    return project
}

// exports.addImagesToProject = async (projectId, files) => {
//     const project = await Project.findById(projectId)
//     if (!project) throw new Error('Project not found')

//     const newUrls = []
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const customName = `${projectId}-${Date.now()}-${i}`
//         const url = await uploadImageToCloudinary(file.path, customName, 'project-images')
//         newUrls.push(url)
//     }

//     project.images.push(...newUrls)
//     await project.save()
//     return project
// }

exports.getProjectById = async (projectId) => {
    const project = await Project.findById(projectId).populate('projectType').populate('userId')
    if (!project) throw new Error('Project not found')
    return project
}

exports.getAllProjects = async () => {
    const projects = await Project.find().populate('projectType').populate('userId')
    return projects
}

exports.getProjectByUserId = async (userId) => {
    const projects = await Project.find({ userId: userId }).populate('projectType').populate('userId')
    return projects
}

exports.approveProject = async (projectId) => {
    const project = await Project.findById(projectId).populate('projectPackageId')
    const now = new Date()
    const months = project.projectPackageId.time

    project.status = 'active'
    project.openTime = new Date(now.setMonth(now.getMonth() + months))
    project.currentAmount = 0

    return await project.save()
}

exports.deniedProject = async (projectId) => {
    const project = await Project.findById(projectId)
    project.status = 'failed'
    return await project.save()
}