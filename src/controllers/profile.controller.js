const Collection = require('../models/collection.model')
const Link = require('../models/link.model')
const User = require('../models/user.model')
const Plans = require('../data/plan.defination.json')


const Profile = async (req, res, next) => {
  const user = await User.findOne({ email: res.locals.user.email }).select('-password -_id -createdAt -__v')
  const collections = await Collection.find({ owner: res.locals.user._id }).select('-__v')
  return res.json({ message: 'Welcome ' + user.name, user, collections })
}

const GetCurrentPlan = async (req, res, next) => {
  const { currentPlan } = res.locals.user
  return res.json({name: currentPlan, ...Plans[currentPlan]})
}

const GetCollections = async (req, res, next) => {
  const { _id: owner } = res.locals.user
  const { collection: name } = req.params
  try {
    const matchStage = {}
    matchStage.owner = owner
    if (name !== undefined) {
      matchStage.name = name
    }
    const result = await Collection.aggregate(
      [{
        $lookup: {
          from: 'links',
          localField: '_id',
          foreignField: 'key',
          as: 'links'
        }
      },
      {
        $match: matchStage
      }],
      { maxTimeMS: 60000, allowDiskUse: true }
    )
    return res.json({ type: 'success', collections: result })
  } catch (error) {
    return res.json({
      type: 'error',
      error: {
        message: error.message
      }
    })
  }
}

/**
 * Creates Link Collection
 * @param name {String} Collection Name
 */
const CreateCollection = async (req, res, next) => {
  const { name } = req.body
  const { _id, currentPlan } = res.locals.user
  const { collection: collectionLimit } = Plans[currentPlan]
  const currentCollectionCount = await Collection.countDocuments({ owner: _id })
  const leftCollection = (collectionLimit - currentCollectionCount)
  console.log(leftCollection)
  if (leftCollection) {
    const collection = new Collection({
      name,
      owner: _id
    })
    collection.save().then((result) => {
      res.json({
        type: 'success',
        message: 'Collection created!'
      })
    }).catch(error => {
      console.error(error)
      res.json({
        type: 'error',
        error: {
          message: 'Unable to create new collection.'
        }
      })
    })
  } else {
    return res.json({
      type: 'error',
      error: {
        message: 'You are out of collection limit, please upgrade your plan'
      }
    })
  }
}

const CreateLink = async (req, res, next) => {
  const { name, url } = req.body
  const { collection: collectionName } = req.params
  const { _id: owner, currentPlan } = res.locals.user
  const { limit: linkLimit, collection: collectionLimit } = Plans[currentPlan]
  const collections = await Collection.findOne({ owner, name: collectionName })
  const { _id: key } = collections
  const linkPerCollection = linkLimit / collectionLimit
  const currentLinkCount = await Link.countDocuments({ key })
  const leftLinks = linkPerCollection - currentLinkCount
  console.log(leftLinks + ' Link(s) left.')
  if (leftLinks) {
    const link = new Link({ name, url, key })
    link.save().then((result) => {
      console.log(result)
      res.json({
        type: 'success',
        message: 'Link created!'
      })
    }).catch(error => {
      console.error(error)
      res.json({
        type: 'error',
        error: {
          message: 'Unable to create new link.'
        }
      })
    })
  } else {
    return res.json({
      type: 'error',
      error: {
        message: 'You can create only ' + linkPerCollection + ' per collection, otherwise upgrade your plan.'
      }
    })
  }
}

module.exports.CreateCollection = CreateCollection
module.exports.CreateLink = CreateLink
module.exports.GetCollections = GetCollections
module.exports.GetCurrentPlan = GetCurrentPlan
module.exports.Profile = Profile
