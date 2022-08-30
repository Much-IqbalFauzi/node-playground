import { User } from "./user.model";

export const person = (req, res) => {
    res.status(200).json({data: req.user})
}
 
export const updatePerson = (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true
        })
            .lean()
            .exec()
        res.status(200).json({data: user})
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}