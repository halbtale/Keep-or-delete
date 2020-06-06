import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs'
import moveFile from 'move-file'

const baseDir = path.join(process.cwd(), 'static', 'images');

export const getImage: RequestHandler = (req, res) => {
    const directoryPath = path.join(baseDir, 'test');
    fs.readdir(directoryPath, (err, files) => {
        if (err) throw new Error('Could not read any file');

        const currentFileName = files[0];
        res.json({
            name: currentFileName,
            url: `http://${req.get('host')}/images/test/${currentFileName}`
        })
    })
};

export const saveImage: RequestHandler = async (req, res) => {
    const imageName = req.query.image as string;
    await moveFile(path.join(baseDir, 'test', imageName), path.join(baseDir, 'saved', imageName))
    res.json({
        message: 'saved'
    })
};

export const deleteImage: RequestHandler = async (req, res) => {
    const imageName = req.query.image as string;
    await moveFile(path.join(baseDir, 'test', imageName), path.join(baseDir, 'deleted', imageName))
    res.json({
        message: 'deleted'
    })
};