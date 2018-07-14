const logout = (req,res)=>{
  res.clearCookie('accessToken');
  res.status(200).redirect('/login');
}
module.exports=logout
