import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { fetchQuery } from "./utils/supports";
import { v4 as uuidv4 } from "uuid";


const client = createClient(
    {
        projectId: "assjodes",
        dataset: "production",
        apiVersion: "2023-02-02",
        token: process.env.REACT_APP_SANITY_TOKEN,
    }
);

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);


export const createNewUser = async (data) => {
    const _doc = {
        _id: data.uid,
        _type: "user",
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        imageUrl: data.photoURL
    };

    await client.createIfNotExists(_doc)
        .then(res => {
            return res;
        });
}


export const uploadAssets = async (asset) => {
    let data;

    if (
        ["image/jpeg",
            "image/png",
            "image/gif",
            "image/jpg",
        ].includes(asset.type)
    ) {

        data = await client.assets.upload(
            "image", asset,
            {
                contentType: asset.type,
                filename: asset.name
            }
        );

        return data;

    } else {

        data = await client.assets.upload(
            "file", asset,
            {
                contentType: asset.type,
                filename: asset.name
            }
        );

        return data;
    }

}


export const deleteAssets = async (id) => {
    const data = await client.delete(id);
    return data;
}


export const uploadPost = async (doc) => {
    await client.create(doc).then((res) => {
        return res;
    }).catch((err) => {
        console.log("Error : ", err);
        alert(err);
    });
}


export const fetchFeeds = async () => {
    const data = await client.fetch(fetchQuery);
    return data;
}


export const deletePost = async (id) => {
    const data = await client.delete(id);
    return data;
}


export const addToCollection = async (id, uid) => {
    await client
        .patch(id)
        .setIfMissing({ collections: [] })
        .insert("after", "collections[-1]", [
            {
                _key: uuidv4(),
                _type: "reference",
                _ref: uid
            }
        ]
        )
        .commit();
}