const mongoose = require("mongoose")
const blogsData = require("./blogsData")
const usersData = require("./usersData")
const Blog = require("../models/Blog")
const User = require("../models/User")
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

mongoose.connect(process.env.DB_URL)

const randint = (s, f) => {
    return Math.floor(Math.random() * f) + s
}

const seedUsers = async () => {
    const ids = []
    let i = 1
    await User.deleteMany({})
    for (let userData of usersData) {
        const user = new User(userData)
        user.description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sunt neque officiis alias? Magnam iste sed aut cum atque nostrum dolor iure placeat, at aliquid laudantium, veniam, corporis id corrupti dolores laborum repellat quo. Aliquid vitae fugiat fuga vel? Officiis."
        user.logo = {
            url: "https://res.cloudinary.com/dqu4adqkj/image/upload/v1709225847/blogger/t1qaw53wdbolmcvqqxt0.jpg",
            filename: "blogger/t1qaw53wdbolmcvqqxt0"
        }
        ids.push(user._id)
        await user.save()
        console.log(`User ${i} saved`)
        i++
    }
    return ids
}

const seedBlogs = async (uids) => {
    let i = 1
    await Blog.deleteMany({})
    const blogIds = []
    for (let blog of blogsData) {
        const targetId = uids[randint(0, uids.length)]
        blog.image = {
            url: "https://blogs.microsoft.com/wp-content/uploads/prod/2024/02/MC4S_1-960x540.jpg"
        }
        const newBlog = new Blog({...blog, content: {
            time: 1710485365583,
            blocks: [
              {
                id: 'gIEKTcR_mX',
                type: 'header',
                data: { text: 'Hey there', level: 2 }
              },
              {
                id: 'bRwqwsP7Bu',
                type: 'paragraph',
                data: {
                  text: 'This is blogger made <u class="cdx-underline"><mark class="cdx-marker"><b>thanks to</b></mark></u>:'
                }
              },
              {
                id: '1K0cXlunBR',
                type: 'table',
                data: {
                  withHeadings: true,
                  content: [
                    [ 'Feature', 'Provider' ],
                    [ 'Upload images', 'Cloudinary' ],
                    [ 'Backend', 'NodeJS/Express' ],
                    [ 'frontend', 'EJS + tailwindCSS' ],
                    [ 'editor service', 'EditorJS' ]
                  ]
                }
              },
              {
                id: 'jeMG2Ic5dW',
                type: 'paragraph',
                data: {
                  text: '<a href="https://editorjs.io/">editorJS Website</a>'
                }
              },
              {
                id: 'edWkN_0D-D',
                type: 'paragraph',
                data: { text: 'you can' }
              },
              {
                id: 'zbnPxxOwY4',
                type: 'list',
                data: {
                  style: 'unordered',
                  items: [
                    'create blogs',
                    'read blogs',
                    'create accounts and like/save blogs',
                    'edit account',
                    'edit blogs',
                    'more'
                  ]
                }
              },
              {
                id: 'l1s45m6R71',
                type: 'code',
                data: {
                  code: 'console.log("Hello from JavaScript")\n' +
                    '\n' +
                    'print("Hello i am Python")\n' +
                    '\n' +
                    'std::cout << "Hello i am c++"\n' +
                    '\n' +
                    '<p>Hey there i am HTML</p>'
                }
              }
            ],
            version: '2.29.0'
          },})
        blogIds.push(newBlog._id)
        newBlog.author = targetId
        await newBlog.save()
        const targetUser = await User.findById(targetId)
        targetUser.blogs.push(newBlog._id)
        await targetUser.save()
        console.log(`blog ${i} saved`)
        i++
    }
    return blogIds
}

const addCollections = async (uids, blogIds) => {
    for (let uid of uids) {
        const collectionCount = randint(0, 5)
        const user = await User.findById(uid)
        for (let i = 0; i < collectionCount; i++) {
            console.log(`Creating collection ${i} for ${uid}`)
            const blogs = []
            for (let j = 0; j < 3; j++) {
                blogs.push(blogIds[randint(0, blogIds.length)])
            }
            user.collections.push({
                name: `collection ${i}`,
                isPrivate: randint(0, 1),
                blogs
            })
        }
        await user.save()
    }
}


const seedDb = async () => {
    const uids = await seedUsers()
    const blogIds = await seedBlogs(uids)
    await addCollections(uids, blogIds)
}

seedDb().then(() => {
    console.log("Success")
    mongoose.connection.close()
})