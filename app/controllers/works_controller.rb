class WorksController < ApplicationController
  def index
    @works = Work.all
  end

  def new
    @work = Work.new
    @work.images.new
  end

  def create
    @work = Work.create!(work_params)
    if @work.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @work = Work.find(params[:id])
  end

  def update
    work = Work.find(params[:id])
    work.update(work_params)
    redirect_to work_path(work.id)
  end
  
  def show
    @work =Work.find(params[:id])
  end
  
  def destroy
    work = Work.find(params[:id])
    work.destroy
    redirect_to root_path
  end
  private
  def work_params
    params.require(:work).permit(:title, :productname, :period, :skill, :detatil, images_attributes:[:src])
  end
end
