const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8082;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Serve content files with proper headers
app.use('/content', (req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
}, express.static(path.join(__dirname, 'content')));

// Handle CMS API routes
app.get('/admin/config.yml', (req, res) => {
    const configPath = path.join(__dirname, 'admin', 'config.yml');
    if (fs.existsSync(configPath)) {
        res.sendFile(configPath);
    } else {
        res.status(404).send('Config file not found');
    }
});

// Handle file-system backend operations
app.put('/content/:filename', (req, res) => {
    const { filename } = req.params;
    const data = req.body;
    
    try {
        const filePath = path.join(__dirname, 'content', filename);
        
        // Ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.json({ success: true, message: 'File saved successfully' });
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).json({ error: 'Failed to save file' });
    }
});

// Handle product creation with index update
app.put('/content/products/:filename', (req, res) => {
    const { filename } = req.params;
    const data = req.body;
    
    try {
        const filePath = path.join(__dirname, 'content', 'products', filename);
        
        // Ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write product file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        // Update index file
        const indexPath = path.join(__dirname, 'content', 'products', 'index.json');
        let indexData = { products: [] };
        
        if (fs.existsSync(indexPath)) {
            indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        }
        
        // Add to index if not exists
        if (!indexData.products.includes(filename)) {
            indexData.products.push(filename);
            fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
        }
        
        res.json({ success: true, message: 'Product saved successfully' });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ error: 'Failed to save product' });
    }
});

// Handle file deletion
app.delete('/content/:folder/:filename', (req, res) => {
    const { folder, filename } = req.params;
    
    try {
        const filePath = path.join(__dirname, 'content', folder, filename);
        
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            
            // Update index file
            const indexPath = path.join(__dirname, 'content', folder, 'index.json');
            if (fs.existsSync(indexPath)) {
                const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
                indexData.products = indexData.products.filter(f => f !== filename);
                fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
            }
            
            res.json({ success: true, message: 'File deleted successfully' });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

// Enable CORS preflight
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.sendStatus(200);
});

// Handle admin routes
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Fallback for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Famms CMS Server running at http://localhost:${port}`);
    console.log(`Admin Panel: http://localhost:${port}/admin`);
    console.log(`Website: http://localhost:${port}`);
});
