const jjTags = require('../../models/jjTags');
let tags = async function (tags) { 
    try {
        for (let tag of tags) {
            let oldTags = await jjTags.findOne({ name: tag.name });
            if (oldTags) {
                await jjTags.updateOne({ name: tags.name }, tag);
            } else {
                await jjTags.create(tag)
            }
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = tags;