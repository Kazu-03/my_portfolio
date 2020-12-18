class CreateWorks < ActiveRecord::Migration[5.2]
  def change
    create_table :works do |t|
      t.string :title,       null:false
      t.string :productname, null:false
      t.string :period,      null:false
      t.string :skill,       null:false
      t.text   :detatil,     null:false
      t.references :user,    foreign_key: true
      t.timestamps
    end
  end
end
