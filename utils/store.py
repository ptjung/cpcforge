from django.conf import settings
import pymongo

class DBEntrypoint:

    def __init__(self, conn_string):
        self._db_ready = True
        try:
            self._mongodb_client = pymongo.MongoClient(conn_string)

            self._db_cpcforge = self._mongodb_client['cpcforge']
            self._db_history = self._mongodb_client['history']
            self._db_profiles = self._mongodb_client['profiles']

            self._entry_map = {
                'submit_logs': self._db_history['submit_logs'],
                'platforms': self._db_profiles['platforms'],
                'users': self._db_cpcforge['accounts_user'],
            }
        except pymongo.errors.ConfigurationError:
            self._db_ready = False

    def __getitem__(self, key):
        if self._db_ready and key in self._entry_map:
            return self._entry_map[key]
        raise self.TableKeyNotDefinedException(
            f"'{key}' cannot be found in entry map (db_ready={self._db_ready})"
        )

    class TableKeyNotDefinedException(Exception):
        """ Exception raised when a given key routes to an undefined table """
        def __init__(self, message, payload=None):
            self.message = message
            self.payload = payload

        def __str__(self):
            return str(self.message)

db_entry_point = DBEntrypoint(settings.MONGODB_CONN_STRING)