ggileData.push(feedback);

        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

        return res.status(200).json({ message: 'Feedback submitted successfully!' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}