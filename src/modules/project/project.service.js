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
    console.log(`The project is: ${project}`)

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
