
    export const appwriteConfig = {
        endpoint: "https://cloud.appwrite.io/v1",
        platform: "tech.uapps.videos",
        projectId: "6719717700058f2ab72b",
        storageId: "671976ad00248cb203ae",
        databaseId: "6719745100042cfcb8fa",
        userCollectionId: "671974810030fc6d22f4",
        videoCollectionId: "671974990019995a8890",
      };

      import {
        Account,
        Avatars,
        Client,
        Databases,
        ID,
        Query,
        Storage,
      } from "react-native-appwrite";
      
      
      
      const client = new Client()
      .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setPlatform(appwriteConfig.platform);


    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    //create a new account and user doc
        export async function createUser(email, password, username) {
            //try to create an account
            try {
              const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username
              );
              
              //if no account throw error
              if (!newAccount) throw Error;
              
              //created the users avatar
              const avatarUrl = avatars.getInitials(username);
          
            //signs the user in
              await signIn(email, password);
              
              //creates a new user document
              const newUser = await databases.createDocument(
                //pass in the db
                appwriteConfig.databaseId,
                //pass in the collection
                appwriteConfig.userCollectionId,
                ID.unique(),
                {
                //pass in all info for the doc along with the account id generatd on creation
                  accountId: newAccount.$id,
                  email: email,
                  userName: username,
                  avatar: avatarUrl,
                }
              );
              //return the new user
              return newUser;
            } catch (error) {
                //catch error and throw a new one for when we call the function
                console.log(error)
                throw new Error(error);
            }
          }
        
        //signs the user in
          export async function signIn(email, password) {
            try {
            //establish new session
              const session = await account.createEmailPasswordSession(email, password);
                
            //return it for use
              return session;
            } catch (error) {
                console.log(error)
            //catch any errors and throw it so we can catch when we try it
              throw new Error(error);
            }
          }     


      export const getCurrentUser = async () => {
        try {
          //get the current user
          const getCurrentUser = await account.get();
          //if no user throw error
          if(!getCurrentUser) throw Error;

      //get exact user from our user docs
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", getCurrentUser.$id)]
    );

    //if no user doc throw error
    if (!currentUser) throw Error;

    //return the user
    return currentUser.documents[0];
        }catch(error){
            console.log(error)
        }
      }

      export async function getAllPosts() {
        try {
          const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt")]
          );
      
          return posts.documents;
        } catch (error) {
          throw new Error(error);
        }
      }  
     
      //get the latest posts
      export async function getLatestPosts() {
        try {
          const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
          );
          return posts.documents;
        } catch (error) {
          throw new Error(error);
        }
      }     

      export async function searchPosts(query) {
        try {
          const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search("title", query)]
          );
      
          if (!posts) throw new Error("Something went wrong");
      
          return posts.documents;
        } catch (error) {
          throw new Error(error);
        }
      }

      export async function getUserPosts(userId) {
        try {
          const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("users", userId)]
          );
      
          return posts.documents;
        } catch (error) {
          throw new Error(error);
        }
      }
      //logs user out
      export async function signOut() {
        try {
          const session = await account.deleteSession("current");
      
          return session;
        } catch (error) {
          throw new Error(error);
        }
      }
      //create a new post
      export async function createVideoPost(form) {
        try {
          const [thumbNailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbNail, "image"),
            uploadFile(form.video, "video"),
          ]);
      
          const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
              title: form.title,
              thumbNail: thumbNailUrl,
              video: videoUrl,
              prompt: form.prompt,
              users: form.userId,
            }
          );
      
          return newPost;
        } catch (error) {
          throw new Error(error);
        }
      }

      //upload a file
      export async function uploadFile(file, type) {
        if (!file) return;
      
       
        const asset = { 
          name : file.fileName,
          type: file.mimeType,
          size: file.fileSize,
          uri: file.uri,
        }
      
        try {
          const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
          );
      
          const fileUrl = await getFilePreview(uploadedFile.$id, type);
          return fileUrl;
        } catch (error) {
          throw new Error(error);
        }
      }
      
      //get the file preview
      export async function getFilePreview(fileId, type) {
        let fileUrl;
      
        try {
          if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
          } else if (type === "image") {
            fileUrl = storage.getFilePreview(
              appwriteConfig.storageId,
              fileId,
              2000,
              2000,
              "top",
              100
            );
          } else {
            throw new Error("Invalid file type");
          }
      
          if (!fileUrl) throw Error;
      
          return fileUrl;
        } catch (error) {
          throw new Error(error);
        }
      }