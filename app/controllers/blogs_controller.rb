class BlogsController < ApplicationController
  def index
    @blogs = Blog.all
  end

  def new
    @blog = Blog.new
    @blog.images.new
  end

  def create
    @blog = Blog.create!(blog_params)
    if @blog.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @blog = Blog.find(params[:id])
  end

  def update
    blog = Blog.find(params[:id])
    blog.update(blog_params)
    redirect_to blog_path(blog.id)
  end

  def show
    @blog =Blog.find(params[:id])
  end
  
  def destroy
    blog = Blog.find(params[:id])
    blog.destroy
    redirect_to root_path
  end

  private
  def blog_params
    params.require(:blog).permit(:title, :detatil, images_attributes:[:src])
  end
end


