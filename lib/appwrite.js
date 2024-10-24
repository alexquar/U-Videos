
    export const appwriteConfig = {
        endpoint: "https://cloud.appwrite.io/v1",
        platform: "tech.uapps.videos",
        projectId: "6719745100042cfcb8fa",
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
                  username: username,
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
              const session = await account.createEmailSession(email, password);
                
            //return it for use
              return session;
            } catch (error) {
                console.log(error)
            //catch any errors and throw it so we can catch when we try it
              throw new Error(error);
            }
          }     
          