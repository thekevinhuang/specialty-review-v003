class CharacteristicSerializer <ActiveModel::Serializer
    attributes :id, :name, :description
    has_many :item_model_characteristics, serializer: ItemModelCharacteristicSerializer
end