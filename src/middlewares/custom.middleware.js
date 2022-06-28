//export function
module.exports = (app) => {
    app.use((err, req, res, next) => {
        console.log(err);
        if (err) {
            res.status(500).json({ message: 'Error'});
        } else {
            next();
        }
    });
}