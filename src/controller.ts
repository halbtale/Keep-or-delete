import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs'
import moveFile from 'move-file'
import mime from 'mime-types'

const baseDir = path.join(process.cwd(), 'static', 'images');

export const getImage: RequestHandler = (req, res) => {
    const directoryPath = path.join(baseDir, 'test');
    fs.readdir(directoryPath, (err, files) => {
        if (err) throw new Error('Could not read any file');

        let isFileValid = false;
        let currentFileName;
        let contentType;

        // Filter hidden files
        for (let i = 0; i < files.length; i++) {
            let _currentFileName = files[i];
            if (_currentFileName) {
                let _contentType = mime.lookup(path.extname(_currentFileName));
                if (_contentType) {
                    contentType = _contentType;
                    currentFileName = _currentFileName
                    break;
                }
            }
        }

        if (currentFileName && contentType) {
            res.json({
                name: currentFileName,
                url: `/images/test/${currentFileName}`,
                contentType
            })
        } else {
            res.status(404).json({
                message: 'No file found'
            })
        }
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