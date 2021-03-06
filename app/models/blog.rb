class Blog < ApplicationRecord
  belongs_to :user,optional: true
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true
end
