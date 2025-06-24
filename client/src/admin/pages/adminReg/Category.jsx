import React from 'react'
const handleSubmit = () => {
    
}
function Category() {
  return (
    <div>
        <h1 align="center">Add Category</h1>
        <table border={3} align='center'>
                <tr>
                    <td>Category</td>
                    <td><input type="text" name="txt_category" id="txt_category" /></td>
                </tr>
                <tr>
                    <td>Photo</td>
                    <td><input type="file" name="file_photo" id=""/></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'><input type="button" value="Submit" onClick={handleSubmit} /></td>
                </tr>
            </table>
    
    </div>
  )
}

export default Category