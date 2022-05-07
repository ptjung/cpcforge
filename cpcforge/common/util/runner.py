from pyston import PystonClient, File
from django.conf import settings
import asyncio


class Runner:

    def __init__(self):
        self.__client = PystonClient(api_key = settings.PISTON_API_KEY)
        self.__result = None
        self.client_loop = asyncio.get_event_loop()
        # asyncio.set_event_loop(self.client_loop)

    async def __solve_tcase_helper(self, user_code, tcase_in):
        """
        Runs the user's code against the test case and updates the reference __result with the user output.
        """
        self.__result = await self.__client.execute("python", [File(user_code, filename="run")], stdin=tcase_in)
        

    def __solve_tcase(self, user_code, tcase_in, tcase_out):
        """
        Solves a single test case.

        --- Return Values ---
        :bool - Whther the test case succeeded or not
        """
        # loop.run_until_complete(self.__solve_tcase_helper(user_code, tcase_in))
        coro = asyncio.sleep(1, result=3)
        asyncio.run_coroutine_threadsafe(coro, self.client_loop)
        self.client_loop.run_until_complete(self.__solve_tcase_helper(user_code, tcase_in))
        return self.__result.raw_json['run']['stdout'].strip() == tcase_out.strip()

    def solve_tcases(self, user_code, tcases_in, tcases_out):
        """
        Solves all test cases.

        --- Return Values ---
        :dict - The number of passed test cases (as 'correct') and the rest
        """
        corr = 0
        for tcase_in, tcase_out in zip(tcases_in, tcases_out):
            if not self.__solve_tcase(user_code, tcase_in, tcase_out):
                break
            corr += 1
        return { 'pass': corr, 'no_pass': len(tcases_in) - corr }

runner = Runner()