class PostsController < ApplicationController
  def index
    @blogs = Blog.all
  end
end
